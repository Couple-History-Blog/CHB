package io.chb.chb.domain.image;

import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
import io.chb.chb.domain.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import static io.chb.chb.core.ImageUsage.IMAGE_PROFILE;
import static io.chb.chb.core.ResponseCode.UPLOAD_PROFILE_SUCCESS;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/chb")
public class ImageController {

    private ImageService imageService;
    private UserService userService;


    @PostMapping("/upload-image")
    public ResponseEntity<?> insertImage(@RequestBody ImageDTO imageInfo) {

        imageService.deleteProfileImage(imageInfo);
        imageService.uploadImage(imageInfo);

        return ResponseEntity.ok().body(UPLOAD_PROFILE_SUCCESS.getMessage());
    }


    @GetMapping("/fetch-user-profile")
    public ResponseEntity<?> getImage(@RequestParam("userId") String userId,
                                      @RequestParam(value = "useOtherUserId", required = false, defaultValue = "false") boolean useOtherUserId) {
        ImageDTO imageInfo = ImageDTO.builder()
                .userId(useOtherUserId ? userService.getOtherUserId(userId) : userId)
                .imageUsage(IMAGE_PROFILE.getImageType())
                .build();
        String imageDataToString = imageService.getImageData(imageInfo);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG); // 이미지 형식에 따라 변경

        return new ResponseEntity<>(imageDataToString, headers, HttpStatus.OK);
    }
}

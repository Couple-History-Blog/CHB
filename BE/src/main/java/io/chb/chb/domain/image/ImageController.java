package io.chb.chb.domain.image;

import io.chb.chb.core.exception.BaseException;
import io.chb.chb.core.exception.ErrorType;
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

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/chb")
public class ImageController {

    private ImageService imageService;

    @PostMapping("/upload-image")
    public ResponseEntity<?> insertImage(@RequestParam("file" )MultipartFile file,
                                         @RequestParam("userId") String userId) {

        try {
            byte[] imageData = file.getBytes();
            String imageDataToString = Base64.getEncoder().encodeToString(imageData);
            String fileExtension = file.getOriginalFilename().split("\\.")[1]; // 확장자 추출
            String mimeType = "image/" + fileExtension; // MIME 타입 설정 (예: image/jpeg)
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", mimeType);
            headers.set("Content-Disposition", "inline; filename=image." + fileExtension);

            // 원래 이미지 삭제 로직
//            imageService.uploadImage(userId, IMAGE_PROFILE.getImageType(), file);
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(imageDataToString); // 바이트 배열을 응답 본문에 설정
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 오류 시 500 응답
        }
    }

    @GetMapping("/fetch-user-profile")
    public ResponseEntity<?> getImage(@RequestParam("userId") String userId) {
        ImageDTO imageInfo = ImageDTO.builder()
                .userId(userId)
                .imageUsage(IMAGE_PROFILE.getImageType())
                .build();
        String imageDataToString = imageService.getImageData(imageInfo);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG); // 이미지 형식에 따라 변경

        return new ResponseEntity<>(imageDataToString, headers, HttpStatus.OK);
    }
}

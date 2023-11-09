package io.chb.chb.domain.image;

import io.chb.chb.domain.user.UserDTO;
import io.chb.chb.domain.user.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static io.chb.chb.core.ImageUsage.*;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImageMapper imageMapper;
    private final UserMapper userMapper;

    public ImageServiceImpl(ImageMapper imageMapper, UserMapper userMapper) {
        this.imageMapper = imageMapper;
        this.userMapper = userMapper;
    }

    public void deleteProfileImage(ImageDTO imageInfo) {
        imageMapper.deleteProfileImage(imageInfo);
    }

    public void uploadImage(ImageDTO imageInfo) {
        imageMapper.uploadImage(imageInfo);
    }

    public String getImageData(ImageDTO imageInfo) {
        Map<String, Object> imageMap = new HashMap<>();
        String imageDataToString = null;
        imageMap = imageMapper.getImageData(imageInfo);

        if (Objects.isNull(imageMap)) {
            UserDTO userInfo = userMapper.findByUserId(imageInfo.getUserId());
            String userGender = userInfo.getUserSexType();
            String imageUsage;

            if (userGender.equals("MALE")) imageUsage = IMAGE_BASIC_MALE_PROFILE.getImageType();
            else imageUsage = IMAGE_BASIC_FEMALE_PROFILE.getImageType();

            imageInfo.setUserId("PERSONAL_USER_ID");
            imageInfo.setImageUsage(imageUsage);

            imageMap = imageMapper.getImageData(imageInfo);
        }


        byte[] imageData = (byte[]) imageMap.get("IMAGE_DATA");
        imageDataToString = Base64.getEncoder().encodeToString(imageData);

        return imageDataToString;
    }
}

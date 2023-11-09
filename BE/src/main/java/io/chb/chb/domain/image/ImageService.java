package io.chb.chb.domain.image;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    void deleteProfileImage(ImageDTO imageInfo);
    void uploadImage(ImageDTO imageInfo);

    String getImageData(ImageDTO imageInfo);
}

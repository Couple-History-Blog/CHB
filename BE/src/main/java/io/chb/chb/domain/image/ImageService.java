package io.chb.chb.domain.image;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    void uploadImage(String userId, String imageUsage, MultipartFile file);

    String getImageData(ImageDTO imageInfo);
}

package io.chb.chb.domain.image;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Mapper
public interface ImageMapper {
    void deleteProfileImage(ImageDTO imageInfo);
    void uploadImage(ImageDTO imageInfo);
    Map<String, Object> getImageData(ImageDTO imageInfo);
}

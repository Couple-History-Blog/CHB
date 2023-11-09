package io.chb.chb.domain.image;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageDTO {
    private String userId;
//    private MultipartFile imageFile;
    private byte[] imageData;
    private String imageName;
    private String imageUsage;

    protected void decodeImageData() {
        setImageData(Base64.getDecoder().decode(this.imageData));
    }
}

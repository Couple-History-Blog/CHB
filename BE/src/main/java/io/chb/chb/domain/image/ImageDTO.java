package io.chb.chb.domain.image;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageDTO {
    private String userId;
    private byte[] imageData;
    private String imageName;
    private String imageUsage;
}

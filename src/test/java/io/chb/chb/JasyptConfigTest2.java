/*
package io.chb.chb;

import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
public class JasyptConfigTest2 {

    @Value("${jasypt.encryptor.password}")
    private final String encryptKey = "qnpfzns590192N#$!na";

    @Value("${datasource.hikari.url}")
    private final String url = "KDO718FX0Zs420L6+A7p34vaf4rJ7MN+hzHuBj7CVMkaGrr8OHvmIA==";

    @Value("${datasource.hikari.username}")
    private final String userName = "xkR3N9xS8F2m68yQ5SxuiQ==";

    @Value("${datasource.hikari.password}")
    private final String password = "+OKoqfQo35Xvz4gIx60IMqt5y7xVxilE";


    PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
    SimpleStringPBEConfig config = new SimpleStringPBEConfig();

    @Test
    public void jasyptTest() {
        Map<String, String> info = new HashMap<>();
        info.put("DB_URL", url);
        info.put("DB_USERNAME", userName);
        info.put("DB_PASSWORD", password);


        config.setPassword(encryptKey);
        config.setAlgorithm("PBEWithMD5AndDES");
        config.setKeyObtentionIterations("1000");       // 암호화 강도
        config.setPoolSize("1");                        // 스레드 풀 사이즈
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        info.forEach((key, value) -> {
//            String encryptText = encryptor.encrypt(value);
            String decryptText = encryptor.decrypt(value);

            log.info("################");
            log.info("KEY : {}", key);
            log.info("VALUE : {}", value);
//            log.info("암호화 : {}", encryptText);
            log.info("복호화 : {}", decryptText);

//            assertEquals(value, decryptText);
        });
    }

}
*/

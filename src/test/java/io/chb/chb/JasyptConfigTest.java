package io.chb.chb;

import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
//@TestPropertySource( properties = { "jasypt.encryptor.password=Planit1127@@" })
@Slf4j
public class JasyptConfigTest {

    @Value("${jasypt.encryptor.password}")
    private String encryptKey;

    PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
    SimpleStringPBEConfig config = new SimpleStringPBEConfig();

    @Test
    public void jasyptTest() {
        Map<String, String> info = new HashMap<>();
        info.put("DB_URL", "jdbc:mysql://127.0.0.1:3306/CHB");
        info.put("DB_USERNAME", "root");
        info.put("DB_PASSWORD", "qwer1234");



        config.setPassword(encryptKey);
        config.setAlgorithm("PBEWithMD5AndDES");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setProviderName("SunJCE");
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setIvGeneratorClassName("org.jasypt.iv.NoIvGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        info.forEach((key, value) -> {
            String encryptText = encryptor.encrypt(value);
            String decryptText = encryptor.decrypt(encryptText);

            log.info("################");
            log.info("KEY : {}", key);
            log.info("VALUE : {}", value);
            log.info("암호화 : {}", encryptText);
            log.info("복호화 : {}", decryptText);

            System.out.println("decrypt: " + encryptor.decrypt("MorUdsXGha525cUj79PiY9A0n2a/Hv9H5RCtiTz1+pMGHn7f4qcOhw=="));

/*
            System.out.println("일산 URL decrypt: " + encryptor.decrypt("58zUNakQcOubsr2ieOFRWo83q0zws3MRwEbIvyePIANMKn2rrA+5OO8NGme8SdMM4gCM+WVu2CqIVTnlB8cdV3vakuOpFvP131j6+DD2OpIdn9LERJMP4g36N2AYtU68"));
            System.out.println("서울대 URL decrypt: " + encryptor.decrypt("Uj76HIJDsiCwS4XS8SXs9TB/bveVbephYhoLU7nh2xNLV89caS1S518Z7YhA6SwcrzKnmJBb2LfDovUXaFI++1Lr6hclAvEKdirokGLjtkhjUWRbLUm+wpC/+gwFmLql"));
            System.out.println("ID decrypt: " + encryptor.decrypt("jwDKqJl0l2zx7p8y+sX+3g=="));
            System.out.println("PWD decrypt: " + encryptor.decrypt("Kk2Km4jNUkuzy1FNndNuhBs4wNy9fnqxgYlvqDgDInUA5rj9GgprxbOVqzzfRDNB6nk8ALIxsoc="));
            System.out.println("URL encrypt: " + encryptor.encrypt("https://cpd-zen.apps.wdh.nhimc.or.kr/"));
*/

            assertEquals(value, decryptText);
        });
    }
}
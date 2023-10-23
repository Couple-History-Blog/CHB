package io.chb.chb.core.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class WebUtil {

    @Value("${webInfo.startUrl}")
    private String START_URL;

    @Value("${webInfo.domain}")
    private String DOMAIN;

    @Value("${webInfo.port}")
    private String PORT;

    @Value("${webInfo.commonUrl}")
    private String COMMON_URL;


    public String buildMainUrl() {
        StringBuilder sb = new StringBuilder();

        return sb.append(START_URL)
                .append(DOMAIN)
                .append(PORT)
                .append(COMMON_URL).toString();
    }

    public String buildUrl(String mainUrl, String addAddress) {
        StringBuilder sb = new StringBuilder();

        return sb.append(mainUrl)
                .append(addAddress).toString();
    }
}

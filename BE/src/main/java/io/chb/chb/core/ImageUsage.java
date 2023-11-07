package io.chb.chb.core;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageUsage {

    IMAGE_PROFILE("I001", "프로필 사진"),
    IMAGE_BACKGROUND("I002", "배경화면 사진"),
    IMAGE_BASIC_FEMALE_PROFILE("I003", "기본 여성 프로필 사진"),
    IMAGE_BASIC_MALE_PROFILE("I004", "기본 남성 프로필 사진");

    private final String code;
    private final String imageType;
}

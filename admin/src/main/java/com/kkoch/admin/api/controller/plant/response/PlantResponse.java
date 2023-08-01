package com.kkoch.admin.api.controller.plant.response;

import lombok.Builder;
import lombok.Data;

@Data
public class PlantResponse {

    Long plantId;

    String code;

    String type;

    String name;

    @Builder
    public PlantResponse(Long plantId, String code, String type, String name) {
        this.plantId = plantId;
        this.code = code;
        this.type = type;
        this.name = name;
    }
}

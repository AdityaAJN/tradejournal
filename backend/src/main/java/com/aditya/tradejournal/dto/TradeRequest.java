package com.aditya.tradejournal.dto;

import com.aditya.tradejournal.entity.MarketGeography;
import com.aditya.tradejournal.entity.TradeType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TradeRequest {

    @NotNull
    private String symbol;

    @NotNull
    private TradeType tradeType;

    @NotNull
    private Double entryPrice;

    private Double exitPrice;

    @NotNull
    private Double quantity;

    @NotNull
    private LocalDate tradeDate;

    private String notes;

    private MarketGeography marketGeography;
}
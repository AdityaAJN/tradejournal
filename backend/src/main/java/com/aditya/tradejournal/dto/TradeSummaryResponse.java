package com.aditya.tradejournal.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TradeSummaryResponse {

    private long totalTrades;
    private double totalProfit;
    private double totalLoss;
    private double netPnL;
    private double winRate;
}
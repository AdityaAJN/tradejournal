package com.aditya.tradejournal.controller;

import com.aditya.tradejournal.dto.TradeRequest;
import com.aditya.tradejournal.entity.Trade;
import com.aditya.tradejournal.entity.User;
import com.aditya.tradejournal.service.TradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trades")
@RequiredArgsConstructor
public class TradeController {

    private final TradeService tradeService;

    @PostMapping
    public Trade addTrade(@RequestBody TradeRequest request,
                          @AuthenticationPrincipal User user) {
        return tradeService.addTrade(request, user);
    }

    @GetMapping
    public List<Trade> getTrades(@AuthenticationPrincipal User user) {
        return tradeService.getUserTrades(user);
    }
    @GetMapping("/summary")
public com.aditya.tradejournal.dto.TradeSummaryResponse getSummary(
        @AuthenticationPrincipal User user) {
    return tradeService.getSummary(user);
}
}
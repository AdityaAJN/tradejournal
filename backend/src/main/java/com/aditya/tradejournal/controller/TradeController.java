package com.aditya.tradejournal.controller;

import com.aditya.tradejournal.dto.TradeRequest;
import com.aditya.tradejournal.entity.Trade;
import com.aditya.tradejournal.service.TradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trades")
@RequiredArgsConstructor
public class TradeController {

    private final TradeService tradeService;

    @PostMapping
    public Trade addTrade(@RequestBody TradeRequest request) {

        return tradeService.addTrade(request);

    }

    @GetMapping
    public List<Trade> getTrades() {

        return tradeService.getAllTrades();

    }

    @DeleteMapping("/{id}")
    public void deleteTrade(@PathVariable Long id) {

        tradeService.deleteTrade(id);

    }

    @DeleteMapping
    public void deleteAllTrades() {

        tradeService.deleteAllTrades();

    }

}
package com.aditya.tradejournal.service;

import com.aditya.tradejournal.dto.TradeRequest;
import com.aditya.tradejournal.entity.Trade;
import com.aditya.tradejournal.entity.User;
import com.aditya.tradejournal.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;

    public Trade addTrade(TradeRequest request) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("Not authenticated");
        }

        User user = (User) authentication.getPrincipal();

        double profitLoss = 0.0;
        if (request.getExitPrice() != null) {
            profitLoss = (request.getExitPrice() - request.getEntryPrice()) * request.getQuantity();
        }

        Trade trade = Trade.builder()
                .symbol(request.getSymbol())
                .tradeType(request.getTradeType())
                .tradeDate(request.getTradeDate())
                .entryPrice(request.getEntryPrice())
                .exitPrice(request.getExitPrice())
                .quantity(request.getQuantity())
                .profitLoss(profitLoss)
                .notes(request.getNotes())
                .marketGeography(request.getMarketGeography())
                .user(user)
                .build();

        return tradeRepository.save(trade);
    }

    public List<Trade> getAllTrades() {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
            return List.of();
        }

        User user = (User) authentication.getPrincipal();
        return tradeRepository.findByUser(user);
    }

    // ✅ These two were missing — added back
    public void deleteTrade(Long id) {
        tradeRepository.deleteById(id);
    }

    public void deleteAllTrades() {
        tradeRepository.deleteAll();
    }
}
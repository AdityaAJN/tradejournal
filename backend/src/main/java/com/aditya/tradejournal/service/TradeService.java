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

        // FIX 5: Get authenticated user from SecurityContext
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        double profitLoss = 0.0;

        if (request.getExitPrice() != null) {
            profitLoss =
                    (request.getExitPrice() - request.getEntryPrice())
                            * request.getQuantity();
        }

        Trade trade = Trade.builder()
                .symbol(request.getSymbol())
                // FIX 6: Map tradeType and tradeDate that were missing
                .tradeType(request.getTradeType())
                .tradeDate(request.getTradeDate())
                .entryPrice(request.getEntryPrice())
                .exitPrice(request.getExitPrice())
                .quantity(request.getQuantity())
                .profitLoss(profitLoss)
                .notes(request.getNotes())
                // FIX 5: Assign user so DB constraint doesn't fail
                .user(user)
                .build();

        return tradeRepository.save(trade);
    }

    public List<Trade> getAllTrades() {

        // FIX 8: Only return trades belonging to the authenticated user
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return tradeRepository.findByUser(user);
    }

    public void deleteTrade(Long id) {
        tradeRepository.deleteById(id);
    }

    public void deleteAllTrades() {
        tradeRepository.deleteAll();
    }
}
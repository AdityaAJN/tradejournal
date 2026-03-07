package com.aditya.tradejournal.service;

import com.aditya.tradejournal.dto.TradeRequest;
import com.aditya.tradejournal.entity.Trade;
import com.aditya.tradejournal.entity.User;
import com.aditya.tradejournal.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;

    public Trade addTrade(TradeRequest request, User user) {

        double profitLoss = 0.0;

        if (request.getExitPrice() != null) {
            if (request.getTradeType().name().equals("BUY")) {
                profitLoss = (request.getExitPrice() - request.getEntryPrice()) * request.getQuantity();
            } else {
                profitLoss = (request.getEntryPrice() - request.getExitPrice()) * request.getQuantity();
            }
        }

        Trade trade = Trade.builder()
                .symbol(request.getSymbol())
                .tradeType(request.getTradeType())
                .entryPrice(request.getEntryPrice())
                .exitPrice(request.getExitPrice())
                .quantity(request.getQuantity())
                .profitLoss(profitLoss)
                .tradeDate(request.getTradeDate())
                .notes(request.getNotes())
                .user(user)
                .build();

        return tradeRepository.save(trade);
    }

    public List<Trade> getUserTrades(User user) {
        return tradeRepository.findByUser(user);
    }
    public com.aditya.tradejournal.dto.TradeSummaryResponse getSummary(User user) {

    var trades = tradeRepository.findByUser(user);

    long totalTrades = trades.size();

    double totalProfit = trades.stream()
            .filter(t -> t.getProfitLoss() != null && t.getProfitLoss() > 0)
            .mapToDouble(Trade::getProfitLoss)
            .sum();

    double totalLoss = trades.stream()
            .filter(t -> t.getProfitLoss() != null && t.getProfitLoss() < 0)
            .mapToDouble(Trade::getProfitLoss)
            .sum();

    double netPnL = trades.stream()
            .filter(t -> t.getProfitLoss() != null)
            .mapToDouble(Trade::getProfitLoss)
            .sum();

    long winningTrades = trades.stream()
            .filter(t -> t.getProfitLoss() != null && t.getProfitLoss() > 0)
            .count();

    double winRate = totalTrades > 0 ? (winningTrades * 100.0) / totalTrades : 0;

    return com.aditya.tradejournal.dto.TradeSummaryResponse.builder()
            .totalTrades(totalTrades)
            .totalProfit(totalProfit)
            .totalLoss(totalLoss)
            .netPnL(netPnL)
            .winRate(winRate)
            .build();
}
public void deleteTrade(Long id, User user) {
    tradeRepository.deleteById(id);
}

public void deleteAllTrades(User user) {
    tradeRepository.deleteAll();
}
}
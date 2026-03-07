package com.aditya.tradejournal.service;

import com.aditya.tradejournal.dto.TradeRequest;
import com.aditya.tradejournal.entity.Trade;
import com.aditya.tradejournal.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;

    public Trade addTrade(TradeRequest request) {

        double profitLoss = 0.0;

        if (request.getExitPrice() != null) {

            if (request.getTradeType().name().equals("BUY")) {

                profitLoss =
                        (request.getExitPrice() - request.getEntryPrice())
                                * request.getQuantity();

            } else {

                profitLoss =
                        (request.getEntryPrice() - request.getExitPrice())
                                * request.getQuantity();

            }

        }

        Trade trade = Trade.builder()
                .symbol(request.getSymbol())
                .tradeType(request.getTradeType())
                .entryPrice(request.getEntryPrice())
                .exitPrice(request.getExitPrice())
                .quantity(request.getQuantity())
                .profitLoss(profitLoss)
                .tradeDate(LocalDate.now())
                .notes(request.getNotes())
                .build();

        return tradeRepository.save(trade);
    }

    public List<Trade> getAllTrades() {

        return tradeRepository.findAll();

    }

    public void deleteTrade(Long id) {

        tradeRepository.deleteById(id);

    }

    public void deleteAllTrades() {

        tradeRepository.deleteAll();

    }

}
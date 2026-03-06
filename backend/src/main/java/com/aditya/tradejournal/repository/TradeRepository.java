package com.aditya.tradejournal.repository;

import com.aditya.tradejournal.entity.Trade;
import com.aditya.tradejournal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {

    List<Trade> findByUser(User user);
}
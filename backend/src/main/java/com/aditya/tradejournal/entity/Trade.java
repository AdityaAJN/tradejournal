package com.aditya.tradejournal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "trades")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;

    @Enumerated(EnumType.STRING)
    private TradeType tradeType;

    private Double entryPrice;

    private Double exitPrice;

    private Double quantity;

    private Double profitLoss;

    private LocalDate tradeDate;

    @Column(length = 1000)
    private String notes;

    @Enumerated(EnumType.STRING)
    private MarketGeography marketGeography;

    @JsonIgnore
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;

   
}
package com.kkoch.admin.domain.auction.repository;

import com.kkoch.admin.api.controller.auction.response.AuctionResponse;
import com.kkoch.admin.domain.auction.Auction;
import com.kkoch.admin.domain.auction.QAuction;
import com.kkoch.admin.domain.auction.Status;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

import static com.kkoch.admin.domain.auction.QAuction.auction;

@Repository
public class AuctionQueryRepository {

    private final JPAQueryFactory queryFactory;

    public AuctionQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<AuctionResponse> findAllAuction() {
        return queryFactory
                .select(Projections.constructor(AuctionResponse.class,
                        auction.id,
                        auction.code,
                        auction.status,
                        auction.startTime,
                        auction.createdDate))
                .from(auction)
                .where(
                        auction.active.isTrue(),
                        auction.status.ne(Status.CLOSE))
                .orderBy(auction.startTime.asc()).fetch();
    }

    public Optional<Auction> findAuctionForMember() {
        Auction auction = queryFactory
                .select(QAuction.auction)
                .from(QAuction.auction)
                .where(
                        QAuction.auction.active.isTrue(),
                        QAuction.auction.status.eq(Status.OPEN))
                .orderBy(QAuction.auction.startTime.asc())
                .fetchOne();
        return Optional.ofNullable(auction);
    }
}

package com.kkoch.user.api.service.reservation;

import com.kkoch.user.api.controller.reservation.response.ReservationResponse;
import com.kkoch.user.api.service.reservation.dto.AddReservationDto;
import com.kkoch.user.api.service.reservation.dto.EditReservationDto;
import com.kkoch.user.domain.member.Member;
import com.kkoch.user.domain.member.repository.MemberRepository;
import com.kkoch.user.domain.reservation.Reservation;
import com.kkoch.user.domain.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final MemberRepository memberRepository;

    //거래 예약 등록
    public Long addReservation(String loginID, AddReservationDto dto) {
        Member member = memberRepository.findByEmail(loginID)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 거래 예약입니다."));
        Reservation reservation = dto.toEntity(member);
        Reservation savedReservation = reservationRepository.save(reservation);
        return savedReservation.getId();
    }

    //거래 예약 삭제
    public Long removeReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 수 없는 거래 예약입니다."));
        reservationRepository.delete(reservation);
        return reservation.getId();
    }

    //거래 예약 조회
    public ReservationResponse getReservation(String loginId) {
        Member member = memberRepository.findByEmail(loginId)
                .orElseThrow(() -> new IllegalArgumentException("조회할 수 없는 회원입니다."));
        Reservation reservation = reservationRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("조회할 수 없는  거래 예약입니다."));
        ReservationResponse response = new ReservationResponse(reservation.getPlantId(),
                reservation.getCount(), reservation.getPrice());
        return response;
    }

    //거래 예약 수정
    public Long setReservation(Long reservationId, EditReservationDto dto) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new NoSuchElementException("조회할 수 없는 거래 예약입니다"));
        reservation.editReservation(dto.getCount(), dto.getPrice());
        return reservation.getId();
    }
}
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import TransInfo from '../mordal/TransInfo';

const TransfortationContent = ({
    time,
    type_list,
    start_time,
    end_time,
    time_list,
    origin,
    destination,
}) => {
    const [transInfoModalOpen, setTransInfoModalOpen] = useState(false);

    const start_date = new Date(start_time * 1000);
    const end_date = new Date(end_time * 1000);
    const start_hours = start_date.getHours();
    const end_hours = end_date.getHours();
    const start_minutes = start_date.getMinutes();
    const end_minutes = end_date.getMinutes();

    const formattedStartHours =
        start_hours < 10 ? `0${start_hours}` : start_hours;
    const formattedStartMinutes =
        start_minutes < 10 ? `0${start_minutes}` : start_minutes;
    const formattedEndHours = end_hours < 10 ? `0${end_hours}` : end_hours;
    const formattedEndMinutes =
        end_minutes < 10 ? `0${end_minutes}` : end_minutes;

    const startTime = formattedStartHours + ':' + formattedStartMinutes;
    const endTime = formattedEndHours + ':' + formattedEndMinutes;

    const handleClick = () => {
        setTransInfoModalOpen(true);
    };

    return (
        <RootContainer>
            <TimeContainer>
                <TimeSlot>{startTime}</TimeSlot>
                <TimeSlot> ~ </TimeSlot>
                <TimeSlot>{endTime}</TimeSlot>
            </TimeContainer>
            <ScheduleContainer onClick={handleClick}>
                <MinuteBox>총 {time}분 소요 예정</MinuteBox>
                <TitleBox>
                    <p>출발 : {origin}</p>
                    <p>도착 : {destination}</p>
                </TitleBox>
            </ScheduleContainer>
            {transInfoModalOpen && (
                <TransInfo
                    time_list={time_list}
                    type_list={type_list}
                    setTransInfoModalOpen={setTransInfoModalOpen}
                />
            )}
        </RootContainer>
    );
};

export default TransfortationContent;

const RootContainer = styled.div`
    display: flex;
    /* width: 100%; */
    /* height: ${(props) => props.height / 30}rem; */
    margin: 0.5rem;
    /* margin-bottom: ${(props) => props.margin / 60}rem; */
`;

const ScheduleContainer = styled.button`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0.25rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #ffbe0b;
    border: none;
    gap: 0.5rem;
`;

const MinuteBox = styled.p`
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: large;
`;
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    align-items: center;
    justify-content: center;

    width: 2rem;
`;

const TimeSlot = styled.div`
    color: gray;
`;

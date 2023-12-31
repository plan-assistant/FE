import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
    IoListCircleOutline,
    IoFlagSharp,
    IoEllipsisHorizontalSharp,
} from 'react-icons/io5';
import useOnClickOutside from '../hooks/useOnClickOutside';
import EditPlan from '../mordal/EditPlan';
import BorderLine from './BorderLine';
import Swal from 'sweetalert2';

const PlanCard = ({
    id,
    start_time,
    end_time,
    place,
    latitude,
    longitude,
    category,
    title,
    onEdit,
    onDelete,
    onChange,
}) => {
    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editPlanModalOpen, setEditPlanModalOpen] = useState(false);
    const currentDate = new Date();
    const endTimeDate = new Date(end_time);
    const isProceed = currentDate < endTimeDate ? true : false;

    const toggleMenu = () => {
        setIsMenuOpen(true);
    };

    useOnClickOutside(ref, () => {
        setIsMenuOpen(false);
    });

    const handleEditClick = () => {
        // "수정하기" 클릭 시 수행할 작업
        setIsMenuOpen(false);
        setEditPlanModalOpen(true);
        onEdit(id);
        onChange();
    };

    const handleDeleteClick = () => {
        // "삭제하기" 클릭 시 수행할 작업
        setIsMenuOpen(false);
        Swal.fire({
            title: '해당 Plan을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '삭제 완료',
                    icon: 'success',
                });
                onDelete(id);
                onChange();
            }
        });
    };

    return (
        <TodoContainer>
            <HeaderBox isProceed={isProceed}>
                <PriorityBox>
                    <IoFlagSharp size={'1rem'} />
                    {isProceed && <p>Plan 미완료</p>}
                    {!isProceed && <p>Plan 완료</p>}
                </PriorityBox>
                {!isMenuOpen && (
                    <IoEllipsisHorizontalSharp
                        size={'1.5rem'}
                        onClick={toggleMenu}
                    />
                )}
                {isMenuOpen && (
                    <Menu ref={ref}>
                        <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            삭제하기
                        </MenuItem>
                    </Menu>
                )}
            </HeaderBox>
            <ContentBox>
                <TitleBox>
                <IoListCircleOutline
                        isProceed={isProceed}
                        size={'1.5rem'}
                        color={isProceed ? '#0ACF83' : '#8572FF'}
                    />
                    <p>{title}</p>
                </TitleBox>
                <PlaceBox>{place === '' ? '' : <p>장소 : {place}</p>}</PlaceBox>
                <BorderLine />
                <TimeContainer>
                    <TypeBox>
                        <p>카테고리 : {category}</p>
                    </TypeBox>
                    <TimeBox>
                        <p>
                            {start_time} ~ {end_time}
                        </p>
                    </TimeBox>
                </TimeContainer>
            </ContentBox>
            {editPlanModalOpen && (
                <EditPlan
                    id={id}
                    title={title}
                    start_time={start_time}
                    end_time={end_time}
                    place={place}
                    latitude={latitude}
                    longitude={longitude}
                    category={category}
                    setEditPlanModalOpen={setEditPlanModalOpen}
                    onChange={onChange}
                />
            )}
        </TodoContainer>
    );
};

export default PlanCard;

const TodoContainer = styled.div`
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
`;
const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 0 0.5rem;
    background-color: ${(props) => (props.isProceed ? '#0ACF83' : '#8572FF')};
    border-radius: 0.5rem 0.5rem 0 0;
    height: 2.5rem;

    color: white;
`;

const PriorityBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    gap: 0.5rem;

    font-size: smaller;
`;

const Menu = styled.div`
    position: relative;
    color: black;
    background: white;
    border: 0.1rem solid #3a86ff;
`;

const MenuItem = styled.div`
    padding: 0.3rem 1rem;
    border: 0.5px solid #3a86ff;
    &:hover {
        background-color: #3a86ff;
        opacity: 0.7;
    }
`;

const ContentBox = styled.div`
    background-color: white;
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 0.5rem;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem;
    gap: 0.5rem;

    font-size: large;
`;

const PlaceBox = styled.div`
    display: flex;
    justify-content: end;
    margin: 0 0.5rem 0 0;
    font-size: small;
`;

const TimeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0.5rem;

    font-size: smaller;
`;

const TypeBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const TimeBox = styled.div`
    display: flex;
`;

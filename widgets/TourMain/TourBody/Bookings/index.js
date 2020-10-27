import styled from "styled-components";

const BookingsLink = styled.a`
    display: inline-block;
    padding: 20px;
    background-color: ${(props) => props.theme.bookingsLink};
    border-radius: 10px;
    font-size: 12px;
    &:hover {
        background-color: ${(props) => props.theme.bookingsLinkHover};
    }
`;

const Bookings = (props) => {
    const bookingsURL = props.tour.bookings;

    return (
        <BookingsLink href={bookingsURL} target="_blank">
            View Bookings
        </BookingsLink>
    );
};

export default Bookings;

import React from "react";

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

const Details = (props) => {
    return (
        <Accordion allowZeroExpanded>
            {props.tour.details.map((detail) => (
                <AccordionItem key={detail.id}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            {detail.label}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>{detail.body}</AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default Details;

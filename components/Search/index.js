import React from "react";
import Autosuggest from "react-autosuggest";
import { withRouter } from "next/router";
import home from "./home.module.css";
import createTrie from "autosuggest-trie";
import { Context } from "../../context/context";
import { withApollo } from "../../util/apollo";
import styled from "styled-components";

class Search extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: "",
            suggestions: [],
        };
    }

    static contextType = Context;

    getSuggestions = (value) => {
        if (this.props.loading) {
            return [];
        }

        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const trie = createTrie(this.context.tours.tours, "name");

        return inputLength === 0 ? [] : trie.getMatches(inputValue);
    };

    getSuggestionValue = (suggestion) => suggestion.name;

    renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    onSuggestionSelected = (event) => {
        let selectedTour = this.context.tours.tours.find((el) => {
            return el.name === event.target.innerText;
        });
        if (this.props.router.pathname.includes("tours")) {
            this.props.router.push(`${selectedTour.id}`);
        } else {
            this.props.router.push(`tours/${selectedTour.id}`);
        }

        // Clear search input on suggestion selection
        this.setState((state) => {
            return {
                value: "",
                suggestions: [],
            };
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: "Search adventures",
            value,
            onChange: this.onChange,
        };

        // Finally, render it!
        return (
            <div className={this.props.home ? "home" : "navbar"}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                    focusInputOnSuggestionClick={false}
                />
            </div>
        );
    }
}

export default withApollo(withRouter(Search));

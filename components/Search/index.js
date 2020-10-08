import React from "react";
import { withRouter } from "next/router";
import Autosuggest from "react-autosuggest";
import createTrie from "autosuggest-trie";
import { Context } from "../../context/context";
import { withApollo } from "../../util/apollo";

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            value: "",
            suggestions: [],
        };
        this.inputRef = React.createRef();
    }

    static contextType = Context;

    getSuggestions = (value) => {
        if (!this.props.loading) {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            const trie = createTrie(this.context.tours.tours, "name");
            return inputLength === 0 ? [] : trie.getMatches(inputValue);
        } else {
            return [];
        }
    };

    getSuggestionValue = (suggestion) => suggestion.name;

    renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

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

        this.setState((state) => {
            return {
                value: "",
                suggestions: [],
            };
        });
    };

    // Trying to get suggestions to render on loading state change.

    // componentDidUpdate(prevProps) {
    //     if (
    //         this.props.tourData !== prevProps.tourData &&
    //         Object.keys(this.props.tourData).length
    //     ) {
    //         this.setState({
    //             value: this.inputRef.current.input.value,
    //         });
    //         console.log(this.context.tours);
    //         console.log(this.inputRef.current.input.value);
    //     }
    // }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: "Search adventures",
            value,
            onChange: this.onChange,
        };

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
                    ref={this.inputRef}
                />
            </div>
        );
    }
}

export default withRouter(Search);

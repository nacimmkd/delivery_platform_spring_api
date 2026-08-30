import { useEffect, useRef, useState } from "react";
import axios from "axios";
import addressService from "@/features/address/services/address.service.ts";
import type { AddressSuggestion } from "@/features/address/services/address.service.ts";
import type { AddressRequest } from "@/shared/types";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 300;

export default function useAddressAutocomplete(
    onChange: (query: string) => void,
    onSelect: (address: AddressRequest, label: string) => void,
) {

    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        abortRef.current?.abort();
    }, []);

    function resetSuggestions() {
        setSuggestions([]);
        setOpen(false);
        setActiveIndex(-1);
    }

    async function fetchSuggestions(query: string) {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        try {
            const results = await addressService.search(query, controller.signal);
            setSuggestions(results);
            setOpen(results.length > 0);
        } catch (err) {
            if (!axios.isCancel(err)) {
                setSuggestions([]);
            }
        } finally {
            setLoading(false);
        }
    }

    function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        onChange(query);
        setActiveIndex(-1);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (query.trim().length < MIN_QUERY_LENGTH) {
            setLoading(false);
            resetSuggestions();
            return;
        }

        debounceRef.current = setTimeout(() => {
            void fetchSuggestions(query);
        }, DEBOUNCE_MS);
    }

    function handleSelect(suggestion: AddressSuggestion) {
        onChange(suggestion.label);
        onSelect(suggestion.address, suggestion.label);
        resetSuggestions();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (open && activeIndex >= 0) {
                handleSelect(suggestions[activeIndex]);
            }
            return;
        }

        if (!open || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    }

    return {
        containerRef,
        suggestions,
        open,
        loading,
        activeIndex,
        setOpen,
        handleQueryChange,
        handleSelect,
        handleKeyDown,
    };
}

import { useMemo } from "react";

export function useProfileFilter(profiles, searchText, selectedTitle) {
    const filteredProfiles = useMemo(() => {
        return profiles.filter((profile) => {
            const name = profile.name?.toLowerCase() || "";
            const title = profile.title || "";

            const matchesSearch = searchText
            ? name.includes(searchText.toLowerCase()) : true;

            const matchesTitle = selectedTitle
            ? title === selectedTitle : true;

            return matchesSearch && matchesTitle;
        });
    }, [profiles, searchText, selectedTitle]);
    return filteredProfiles;
}
import csv
import json
import sys

KEYS = [
    "site-owner",
    "meta-title",
    "site-title",
    "site-description",
    "logo-alt",
    "not-found-title",
    "not-found-text",
    "home",
    "about",
    "print",
    "this-form",
    "suggest-resource",
    "suggest-resource-form-id",
    "suggest-resource-intro",
    "suggest-resource-intro-alt-form",
    "feedback",
    "feedback-form-id",
    "feedback-intro",
    "feedback-intro-alt-form",
    "filter-title",
    "intro-description",
    "close",
    "filter-description",
    "filter-description-filters",
    "filter-description-one-result",
    "filter-description-no-results",
    "flag-resource-label",
    "flag-resource-success",
    "notes-label",
    "search-label",
    "where-label",
    "zip-placeholder",
    "what-label",
    "who-label",
    "who-help",
    "languages-label",
    "show-filters",
    "hide-filters",
    "clear-filters",
    "scroll-to-top",
    "load-more-results",
    "website",
    "name-label",
    "link-label",
    "phone-label",
    "regardless-of-status",
    "last-updated",
    "Money",
    "Food",
    "Housing",
    "Health",
    "Mental Health",
    "Utilities",
    "Legal Help",
    "Families",
    "Immigrants",
    "LGBTQI",
    "Business Owners",
    "Students",
    "Seniors",
    "Hospitality Workers",
    "Currently Incarcerated",
    "Healthcare Workers",
    "Domestic Workers",
    "Creative Industry",
    "English",
    "Spanish",
    "Arabic",
    "Polish",
    "Urdu",
    "Vietnamese",
    "Chinese",
    "Tagalog",
    "French",
    "Hindi",
    "Gujarati",
]


if __name__ == "__main__":
    i18n_dict = {}
    i18n_col = sys.argv[1]
    rows = [r for r in csv.DictReader(sys.stdin)]
    rows_dict = {r["ID"]: r[i18n_col] for r in rows if r.get("ID") and r.get(i18n_col)}

    for key in KEYS:
        i18n_dict[key] = rows_dict.get(key, "").strip()

    sys.stdout.write(json.dumps(i18n_dict, indent=2, ensure_ascii=False))

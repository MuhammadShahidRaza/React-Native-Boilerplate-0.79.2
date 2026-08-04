import { FontSize } from 'types/fontTypes';

/**
 * Single source of truth for all form controls: Input, Dropdown, Autocomplete, PhoneInput.
 * Use with COLORS from utils (e.g. COLORS.ICONS, COLORS.TEXT, COLORS.PLACEHOLDER, COLORS.ERROR).
 */
export const INPUT_THEME = {
  title: {
    fontSize: FontSize.MediumSmall,
    marginBottom: 6,
  },
  value: {
    fontSize: FontSize.MediumSmall,
  },
  placeholder: {
    fontSize: FontSize.MediumSmall,
  },
  error: {
    fontSize: FontSize.Small,
  },
  option: {
    fontSize: FontSize.MediumSmall,
  },
  input: {
    height: 52,
    borderRadius: 26,
    borderRadiusInline: 26,
  },
  autocomplete: {
    height: 45,
  },
} as const;

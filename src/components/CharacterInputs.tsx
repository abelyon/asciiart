import { CharacterInput } from './CharacterInput';
import { ImageSettings } from './ImageSettings';

interface CharacterInputsProps {
  slashChar: string;
  equalsChar: string;
  voidChar: string;
  onSlashCharChange: (value: string) => void;
  onEqualsCharChange: (value: string) => void;
  onVoidCharChange: (value: string) => void;
  imageBgEnabled: boolean;
  imageBgColor: string;
  onImageBgEnabledChange: (enabled: boolean) => void;
  onImageBgColorChange: (color: string) => void;
}

export const CharacterInputs = ({
  slashChar,
  equalsChar,
  voidChar,
  onSlashCharChange,
  onEqualsCharChange,
  onVoidCharChange,
  imageBgEnabled,
  imageBgColor,
  onImageBgEnabledChange,
  onImageBgColorChange,
}: CharacterInputsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 items-start">
      <CharacterInput
        label="Slash Character (/)"
        value={slashChar}
        onChange={onSlashCharChange}
        onBlur={onSlashCharChange}
        placeholder="/"
        presets={[
          { label: '/', value: '/' },
          { label: 'ALPHA', value: '!ALPHA' },
          { label: '|', value: '|' },
          { label: '#', value: '#' },
          { label: '*', value: '*' },
          { label: '&@#', value: '&@#' },
        ]}
        description="Character for / elements"
        defaultValue="/"
        info="Replaces all '/' characters in the ASCII patterns. Use multiple characters like '&@#' for random selection, or '!ALPHA' to use the input letter itself."
      />

      <CharacterInput
        label="Equals Character (=)"
        value={equalsChar}
        onChange={onEqualsCharChange}
        onBlur={onEqualsCharChange}
        placeholder="="
        presets={[
          { label: '=', value: '=' },
          { label: 'Space', value: ' ' },
          { label: '-', value: '-' },
          { label: '_', value: '_' },
          { label: '#', value: '#' },
        ]}
        description="Character for = elements"
        defaultValue="="
        info="Replaces all '=' characters in the ASCII patterns. Use multiple characters like '&@#' for random selection, or '!ALPHA' to use the input letter itself."
      />

      <CharacterInput
        label="Void Character (spaces)"
        value={voidChar}
        onChange={onVoidCharChange}
        onBlur={onVoidCharChange}
        placeholder="Space"
        presets={[
          { label: 'Space', value: ' ' },
          { label: '.', value: '.' },
          { label: '·', value: '·' },
          { label: '_', value: '_' },
          { label: '*', value: '*' },
        ]}
        description="Character for empty space"
        defaultValue=" "
        info="Replaces all space characters in the ASCII patterns (background/void areas). Use multiple characters like '&@#' for random selection, or '!ALPHA' to use the input letter itself."
      />

      <ImageSettings
        imageBgEnabled={imageBgEnabled}
        imageBgColor={imageBgColor}
        onBgEnabledChange={onImageBgEnabledChange}
        onBgColorChange={onImageBgColorChange}
        info="Configure background settings for exported images. Enable background to add a colored background, or disable for transparent images. Use the color picker or enter a hex code to customize the background color."
      />
    </div>
  );
};

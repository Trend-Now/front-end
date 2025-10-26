import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useCallback, useState } from 'react';
import Textarea from './Textarea';

interface TextareaFieldProps extends ComponentPropsWithoutRef<typeof Textarea> {
  maxLength: number;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ variant, size, maxLength, onChange, ...props }, ref) => {
    const [textLength, setTextLength] = useState(0);
    const handleTextChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextLength(e.target.value.length);
        onChange?.(e);
      },
      [onChange]
    );
    return (
      <div className="flex w-full flex-col gap-1">
        <Textarea
          ref={ref}
          variant={variant}
          size={size}
          maxLength={maxLength}
          onChange={handleTextChange}
          {...props}
        />
        <div className="flex justify-end text-2xs">
          {textLength} / {maxLength}
        </div>
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';

export default TextareaField;

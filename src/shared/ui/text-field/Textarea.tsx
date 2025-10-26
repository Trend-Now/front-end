import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/';

const textareaVariants = cva(
  'border rounded-xl w-full text-gray-800 focus:outline-none p-3 resize-none',
  {
    variants: {
      variant: {
        basic: 'bg-white border-gray-200 focus:border-gray-400',
        disabled: 'bg-gray-100 border-gray-300',
        error: 'bg-white border-negative',
      },
      size: {
        desktop: 'text-md',
        mobile: 'text-xs',
      },
    },
    defaultVariants: {
      variant: 'basic',
      size: 'desktop',
    },
  }
);

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /**@param {String} variant 입력 상자의 상태에 따른 스타일을 고를 수 있습니다. */
  variant?: 'basic' | 'disabled' | 'error';
  /**@param {String} size PC 혹은 모바일 */
  size?: 'desktop' | 'mobile';
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=6-1531&t=6sPVBOpXARABMUkQ-4
 * */

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant, size }), className)}
        disabled={variant === 'disabled' || disabled}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

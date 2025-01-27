import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import TextInput from '@/app/ui/atom/text-input/text-input'

const meta = {
  title: 'view/atom/TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'default',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Disabled',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    defaultValue: 'asd',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    defaultValue: 123,
  },
};

export const NumberWithPlaceholder: Story = {
  args: {
    type: 'number',
    defaultValue: '',
    placeholder: 'number',
  },
};

export const WithIcon: Story = {
  args: {
    defaultValue: '',
    icon: MagnifyingGlassIcon,
  },
};

export const DisabledWithIcon: Story = {
  args: {
    defaultValue: 'Disabled with icon',
    disabled: true,
    icon: MagnifyingGlassIcon,
  },
};

export const WithPlaceholder: Story = {
  args: {
    defaultValue: '',
    placeholder: 'placeholder',
  },
};

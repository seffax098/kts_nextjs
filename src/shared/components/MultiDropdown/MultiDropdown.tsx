import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Input from '../Input';
import styles from './styles.module.scss';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Icon from '../icons/Icon';

export type Option = {
  key: number;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
  single?: boolean
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  single = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggleOption = (option: Option) => {
    const exists = value.some((v) => v.key === option.key);

    const newValue = !single ? (exists ? value.filter((v) => v.key !== option.key) : [...value, option]) : (exists ? [] : [option])

    onChange(newValue);
    setSearch('');
    if (single) setIsOpen(false)
  };

  const openDropdown = () => {
    if (!disabled) setIsOpen(true);
  };

  const closedValue = getTitle(value);
  const isEmpty = value.length === 0 && !isOpen;

  const displayValue = isOpen ? search : value.length ? closedValue : '';

  return (
    <div ref={wrapperRef} className={classNames(styles.multiDropdown, className)}>
      <Input
        inputClassName={classNames(styles.inputDropdown, {
          [styles.multiDropdownClose]: !isOpen,
          [styles.multiDropdownOpen]: isOpen,
          [styles.multiDropdownEmpty]: isEmpty,
        })}
        value={displayValue}
        onChange={setSearch}
        disabled={disabled}
        onMouseDown={openDropdown}
        placeholder={getTitle(value)}
        readOnly={!isOpen}
        afterSlot={<Icon color="secondary" >{<ArrowDownIcon />}</Icon>}
      />

      {isOpen && !disabled && (
        <div className={styles.multiDropdownOptions}>
          {filteredOptions.map((option) => (
            <label
              key={option.key}
              className={classNames(styles.multiDropdownOption, {
                [styles.multiDropdownOptionActive]: value.some((v) => v.key === option.key),
              })}
            >
              <input
                className={styles.optionCheckbox}
                type={single ? 'radio' : 'checkbox'}
                checked={value.some((v) => v.key === option.key)}
                onChange={() => toggleOption(option)}
              />
              {getTitle([option])}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;

import MultiDropdown, { type Option } from '@shared/components/MultiDropdown'
import styles from './Filters.module.scss'
import { sortOptions } from '@shared/constants/SortOption'
import { memo } from 'react'

interface Props {
    categoriesOptions: Option[]
    selectedCategories: Option[]
    selectedSorted: Option[]
    handleDropdownChangeCat: (value: Option[]) => void
    handleDropdownChangeSort: (value: Option[]) => void
}

const sortLabels: Record<string, string> = {
    'price:asc': 'Price: Low - High',
    'price:desc': 'Price: High - Low',
    'rating:asc': 'Rating: Low - High',
    'rating:desc': 'Rating: High - Low',
    'createdAt:asc': 'Oldest',
    'createdAt:desc': 'Newest',
}

const Filters = ({ categoriesOptions, selectedCategories, handleDropdownChangeCat, selectedSorted, handleDropdownChangeSort }: Props) => {
    return (
        <div className={styles.filters}>
            <MultiDropdown
                options={categoriesOptions}
                value={selectedCategories}
                onChange={handleDropdownChangeCat}
                getTitle={(value) => (value.length ? value.map((v) => v.value).join(', ') : 'Categories')}
            />

            <MultiDropdown
                options={sortOptions}
                value={selectedSorted}
                onChange={handleDropdownChangeSort}
                getTitle={(value) => (value.length ? sortLabels[value[0].value] : 'Sorted by')}
                single
            />
        </div>
    )
}

export default memo(Filters)
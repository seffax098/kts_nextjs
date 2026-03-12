import Text from '@shared/components/Text';
import type { Product } from '@shared/types/product';
import styles from './RelatedItems.module.scss';
import CardSkeleton from '@shared/components/CardSkeleton';
import RelatedItem from './component/RelatedItem';

interface Props {
  relatedItems: Product[];
  loading: boolean;
}

const RelatedItems = ({ relatedItems, loading }: Props) => {
  return (
    <div className={`${styles.relatedItems}`}>
      <Text view="title">Related Items</Text>
      <div className={`${styles.related__list}`}>
        {loading && <CardSkeleton />}
        {relatedItems.map((item) => {
          return (
            <RelatedItem
              key={item.documentId}
              item={item}
            />
          )
        })}
      </div>
    </div>
  );
};

export default RelatedItems;

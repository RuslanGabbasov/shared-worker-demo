import React from 'react';
import styles from './common.module.css';

const Badge = ({count}: {count: number}): JSX.Element | null => {
    return count > 0 ? (
        <div className={styles.badge} key={`badge_${count}`}>
            {count}
        </div>
    ) : null;
};

export default Badge;
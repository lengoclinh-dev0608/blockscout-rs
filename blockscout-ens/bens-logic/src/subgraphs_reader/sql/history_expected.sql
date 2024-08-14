SELECT transaction_id, block_number, array_agg(table_name) as actions
FROM (
    SELECT distinct on (transaction_id, table_name) *
    FROM (
        SELECT 'transfer' as table_name, block_number, transaction_id
        FROM sgd4.transfer
        WHERE domain = $1
            UNION ALL
        SELECT 'new_owner' as table_name, block_number, transaction_id
        FROM sgd4.new_owner
        WHERE domain = $1
            UNION ALL
        SELECT 'new_resolver' as table_name, block_number, transaction_id
        FROM sgd4.new_resolver
        WHERE domain = $1
            UNION ALL
        SELECT 'new_ttl' as table_name, block_number, transaction_id
        FROM sgd4.new_ttl
        WHERE domain = $1
            UNION ALL
        SELECT 'wrapped_transfer' as table_name, block_number, transaction_id
        FROM sgd4.wrapped_transfer
        WHERE domain = $1
            UNION ALL
        SELECT 'name_wrapped' as table_name, block_number, transaction_id
        FROM sgd4.name_wrapped
        WHERE domain = $1
            UNION ALL
        SELECT 'name_unwrapped' as table_name, block_number, transaction_id
        FROM sgd4.name_unwrapped
        WHERE domain = $1
            UNION ALL
        SELECT 'fuses_set' as table_name, block_number, transaction_id
        FROM sgd4.fuses_set
        WHERE domain = $1
            UNION ALL
        SELECT 'expiry_extended' as table_name, block_number, transaction_id
        FROM sgd4.expiry_extended
        WHERE domain = $1
            UNION ALL
        SELECT 'addr_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.addr_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'multicoin_addr_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.multicoin_addr_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'name_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.name_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'abi_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.abi_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'pubkey_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.pubkey_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'text_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.text_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'contenthash_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.contenthash_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'interface_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.interface_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'authorisation_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.authorisation_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'version_changed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.version_changed t
        JOIN sgd4.resolver r 
        ON t.resolver = r.id
        WHERE r.domain = $1
            UNION ALL
        SELECT 'name_registered' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.name_registered t
        JOIN sgd4.registration r
        ON t.registration = r.id
        WHERE r.domain = $1
        UNION ALL
        SELECT 'name_renewed' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.name_renewed t
        JOIN sgd4.registration r
        ON t.registration = r.id
        WHERE r.domain = $1
        UNION ALL
        SELECT 'name_transferred' as table_name, t.block_number, t.transaction_id 
        FROM sgd4.name_transferred t
        JOIN sgd4.registration r
        ON t.registration = r.id
        WHERE r.domain = $1
        ) all_events
    ORDER BY transaction_id
) unique_events
GROUP BY transaction_id, block_number
ORDER BY block_number asc


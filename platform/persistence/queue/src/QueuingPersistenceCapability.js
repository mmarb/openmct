/*global define*/

define(
    [],
    function () {
        "use strict";

        /**
         * The QueuingPersistenceCapability places `persist` calls in a queue
         * to be handled in batches.
         * @param {PersistenceQueue} queue of persistence calls
         * @param {PersistenceCapability} persistence the wrapped persistence
         *        capability
         * @param {DomainObject} domainObject the domain object which exposes
         *        the capability
         */
        function QueuingPersistenceCapability(queue, persistence, domainObject) {
            var queuingPersistence = Object.create(persistence);

            // Override persist calls to queue them instead
            queuingPersistence.persist = function () {
                return queue.put(domainObject, persistence);
            };

            return queuingPersistence;
        }

        return QueuingPersistenceCapability;
    }
);
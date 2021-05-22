package com.ecommerce.config;

import com.ecommerce.entitiy.Product;
import com.ecommerce.entitiy.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;

    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration configuration) {
        HttpMethod[] unsupportedMethods = {HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.POST};
        configuration
                .getExposureConfiguration().forDomainType(Product.class).withItemExposure((metadata, httpmethods) -> httpmethods.disable(unsupportedMethods))
                .withCollectionExposure((metadata, httpmethods) -> httpmethods.disable(unsupportedMethods));

        configuration
                .getExposureConfiguration().forDomainType(ProductCategory.class).withItemExposure((metadata, httpmethods) -> httpmethods.disable(unsupportedMethods))
                .withCollectionExposure((metadata, httpmethods) -> httpmethods.disable(unsupportedMethods));


        //call an helper method
        exposeMIds(configuration);
    }

    private void exposeMIds(RepositoryRestConfiguration configuration) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        configuration.exposeIdsFor(domainTypes);
    }

}

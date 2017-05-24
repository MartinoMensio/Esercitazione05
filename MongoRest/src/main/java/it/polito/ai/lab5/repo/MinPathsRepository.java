package it.polito.ai.lab5.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import it.polito.ai.lab5.entities.Key;
import it.polito.ai.lab5.entities.MinPath;

@CrossOrigin(origins = "*")
@RepositoryRestResource(collectionResourceRel = "min_paths", path = "min_paths")
public interface MinPathsRepository extends MongoRepository<MinPath, Key> {
	/**
	 * Endpoint for searching by using two different parameters
	 * {@link /min_paths/search/find?src=477&dst=557}. Otherwise the specific
	 * path can be reached at urls like {@link /min_paths/447_557}
	 * 
	 * @param idSource
	 * @param idDestination
	 * @return
	 */
	@Query("{ '_id' : { 'src': ?0, 'dst' : ?1 }}")
	public List<MinPath> find(@Param("src") String idSource, @Param("dst") String idDestination);

	public List<MinPath> findByIdSource(@Param("idSource") String idSource);
	
	public List<MinPath> findByIdDestination(@Param("idDestination") String idDestination);

}
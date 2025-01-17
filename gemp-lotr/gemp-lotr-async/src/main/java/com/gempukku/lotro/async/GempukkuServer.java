package com.gempukku.lotro.async;

import com.gempukku.lotro.builder.DaoBuilder;
import com.gempukku.lotro.builder.ServerBuilder;
import org.apache.log4j.Logger;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class GempukkuServer {
    private final Map<Type, Object> context;

    public GempukkuServer() {
        Map<Type, Object> objects = new HashMap<>();

        var logger = Logger.getLogger(GempukkuServer.class);

        //Libraries and other important prereq managers that are used by lots of other managers
        logger.info("GempukkuServer loading prerequisites...");
        ServerBuilder.CreatePrerequisites(objects);
        //Now bulk initialize various managers
        logger.info("GempukkuServer loading DAOs...");
        DaoBuilder.CreateDatabaseAccessObjects(objects);
        logger.info("GempukkuServer loading services...");
        ServerBuilder.CreateServices(objects);
        logger.info("GempukkuServer starting servers...");
        ServerBuilder.StartServers(objects);
        logger.info("GempukkuServer startup complete.");

        context = objects;
    }

    public Map<Type, Object> getContext() {
        return context;
    }
}

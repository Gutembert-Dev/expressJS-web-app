mkdir .keycloack/.bashrc
nano .keycloack/.bashrc
paste:
    export JBOSS_HOME=/home/log/Documents/devs/keycloak-11.0.3
    export JAVA=/usr/lib/jvm/java-8-openjdk-amd64/bin/java
echo "# keycloack \
source <path>/<to>/.keycloak/.bashrc" >> ~/.bashrc 

change port 8080 to 8081 in domain/configuration/domain.xml and in standalne/configuration/standalone.xml

grep -R "keycloak-logo-text.png" and change keycloak logo to camer tech logo
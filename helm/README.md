# gsn-relayer-k8s
Helm chart for deploying a [Gas Station Network (v1)](https://github.com/opengsn/gsn) in Kubernetes.


## Installing the Chart

To install the chart with the release name `<release-name>`:

```console
$ git clone https://github.com/gjeanmart/gsn-relayer
$ helm install <release-name> ./gsn-relayer --namespace <namespace> --values </path/to/values.yml>
```

## Uninstalling the Chart

To uninstall/delete the `<release-name>` deployment:

```console
$ helm uninstall <release-name> --namespace <namespace>
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Values

This a sample version of `values.yml`

```yaml
# Default values for gsn-relayer-k8s.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: dmihal/gsn-relay-xdai # or gjeanmart/gsn-relayer-arm
  tag: latest
  pullPolicy: IfNotPresent

env:
  URL: https://gsn.example.com
  NODE_URL: wss://mainnet.infura.io/ws/v3/XXXXXXXX
  RELAY_HUB: "0xD216153c06E857cD7f72665E0aF1d7D82172F494"
  GAS_PRICE_PERCENT: 10
  FEE: 50 # TODO need to be added to the run command

service:
  type: ClusterIP
  port: 80
  loadBalancerIP:

ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - gsn.example.com
  tls:
    - secretName: gsn-tls
      hosts:
        - gsn.example.com

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

podAnnotations: {}

deploymentAnnotations: {}

## Persist data to a persitent volume
persistence:
  enabled: false
  #storageClass:
  #accessMode: ReadWriteOnce
  #size: 50Mi
  #existingClaim: "gsn-relayer-pvc"
```

# gsn-relayer-k8s
Helm chart for deploying a [Gas Station Network (v1)](https://github.com/opengsn/gsn) in Kubernetes.

## TL;DR;

```console
$ git clone https://github.com/gjeanmart/gsn-relayer-k8s
$ cd gsn-relayer-k8s
$ helm install .
```


## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release .
```

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

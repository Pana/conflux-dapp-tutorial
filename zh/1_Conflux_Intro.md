# Conflux introduction

[Conflux](https://confluxnetwork.org/) 是一个核心成员来自清华大学姚班的强大团队所打造的一个兼容 EVM 的高性能，完全去中心化公链。

<img src="https://github.com/Conflux-Chain/design-resource-lab/blob/master/0.%20CONFLUX%20LOGO/Stacked%20lockup/with%20space/Conflux_with%20space_PNG/Stacked_with%20space-1.png?raw=true" width="800px"></img>

## 特性

### 树图账本结构

Conflux 协议采用独创的树图(TreeGraph)账本结构及[GHAST](https://confluxnetwork.org/files/Conflux_Technical_Presentation_20200309.pdf)共识协议，能够实现网络并行出块，从而大大提高网络吞吐率，降低确认时间。

![](https://developer.confluxnetwork.org/img/tree_graph.jpg)

Conflux 网络平均出块时间为 0.5S，每个区块的 gasLimit 为 3000w gas，即 3000 TPS（CFX转账）

如果想详细了解 TreeGraph，可以参看[这篇技术介绍](https://confluxnetwork.org/files/Conflux_Technical_Presentation_20200309.pdf)

### 高性能

因为 Conflux 可以实现并行出块，网络的吞吐率得到了大幅提高，经过实测可以达到 3000 TPS（CFX转账），并且可以在一分钟内实现交易确认。相比于比特币的 7TPS 和 以太坊的 40TPS 提高了一到两个数量级。

### 低手续费+代付机制

得益于网络的吞吐率大幅提高，使得目前网络的交易手续费大大降低, 目前交易平均手续费为 100-10000 左右，远远低于以太坊动辄几Gwei到几十Gwei 的手续费价格。

另外 Conflux 网络还实现了独特的赞助商机制：允许任何人为任意合约进行手续费赞助，合约被赞助后用户同合约交互所产生的燃气和存储费均由赞助商支付，普通用户可以零手续费与 Dapp 交互。

## 概念介绍

Conflux 实现了 EVM 兼容的虚拟机，几乎所有的以太坊智能合约可以直接部署到 Conflux 网络。但同以太坊网络还是有一些差别。

### base32 地址

以太坊采用 hex40 格式地址：

```txt
0x12c0ced72d5579b3DF107b0697948d267C98D3d9
```

Conflux 则采用了 base32 编码地址：

```txt
cfx:aakpbx01fzm1xp89cb7urf6yvyxh3ggx5e9hz07b38
```

### Epoch

Conflux 账本结构不同于以太坊和比特币为树图结构，在树图中会通过最重子树算法确定账本的主轴（pivot chain)，主轴上的每个区块会定义一个 Epoch，主轴某区块的高度，即为账本的 Epoch number。同一个纪元中可能会有多个区块。

### `cfx` RPC

Conflux 定义了自己的以 `cfx` 为前缀的 RPC 方法，因此以太坊的主流 SDK 无法在 Conflux 网络使用，需要使用 Conflux 的自行开发的 SDK 来同网络交互，目前提供多种语言的 SDK：

* js-conflux-sdk
* go-conflux-sdk
* java-conflux-sdk

### 内置合约

### 赞助商机制

## 参考链接

* [Conflux 官网](https://confluxnetwork.org/)
* [开发者文档](https://developer.confluxnetwork.org/)

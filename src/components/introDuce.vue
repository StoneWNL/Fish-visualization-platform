<template>
    <div class="cost-control-component">
        <div class="content">
            <h2>成本控制</h2>
            <p>
                成本控制是指企业或组织通过采取各种管理和监控手段，以达到降低、控制和优化成本的目标。
                它是管理会计的一个重要领域，涉及到对成本的收集、分类、分析和决策等方面。
            </p>
            <h2>淡海水鱼类养殖管理可视化平台对成本控制的作用</h2>
            <p>
                通过淡海水鱼类养殖管理可视化平台，养殖企业可以更加全面、准确地了解和掌握成本情况，
                及时发现问题并采取相应措施，从而实现成本的降低、控制和优化，提高经营效益和可持续发展能力。
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CostControlComponent',
};
</script>

<style scoped>
.cost-control-component {
    background-color: #333;
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    max-width: 800px;
    padding: 20px;
    text-align: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    /* 添加此行以显示滚动条 */
}

h2 {
    color: #fff;
    font-size: 20px;
    margin-bottom: 10px;
}

p {
    font-size: 16px;
    line-height: 1.5;
}
</style>

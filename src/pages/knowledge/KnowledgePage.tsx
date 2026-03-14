
const KnowledgePage = () => {
    return (
        <div>
            <div className="bg-background text-foreground p-8">
                Должен менять фон и текст при смене темы
            </div>

            <div className="bg-red-500 dark:bg-blue-500 p-4">
                Этот должен стать синим в dark (проверка, что variant работает)
            </div>
        </div>
    );
};

export default KnowledgePage;

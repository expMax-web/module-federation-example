import { Component, ErrorInfo, FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: null | Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error });
  }

  render(): ReactNode {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <div>Произошла ошибка при подгрузке модуля</div>;
    }

    return children;
  }
}
